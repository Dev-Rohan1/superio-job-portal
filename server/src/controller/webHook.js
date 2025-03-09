import { Webhook } from "svix";
import User from "../model/user.js";

const clerkWebhook = async (req, res) => {
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    const payload = JSON.stringify(req.body);
    await webhook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });
  } catch (error) {
    return res.status(400).json({ error: "Webhook verification failed" });
  }

  const { data, type } = req.body;

  try {
    switch (type) {
      case "User.created": {
        const userData = {
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0]?.email_address || "",
          resume: "",
          image: data.image_url,
        };

        await User.save(userData);
        return res.status(201).json({ message: "User created" });
      }

      case "User.updated": {
        const userData = {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0]?.email_address || "",
          image: data.image_url,
        };

        console.log(userData);

        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ message: "User updated" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "User deleted" });
      }

      default:
        return res.status(400).json({ error: "Unhandled event type" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

export default clerkWebhook;
