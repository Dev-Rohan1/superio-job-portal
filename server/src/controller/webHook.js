import { Webhook } from "svix";
import User from "../model/user.js";

const clerkWebhook = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0]?.email_address || "",
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        };

        await User.save(userData);
        return res.json({});

        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address || "",
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);

        return res.json({});

        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({});
        break;
      }

      default:
        return res.json({});
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

export default clerkWebhook;
