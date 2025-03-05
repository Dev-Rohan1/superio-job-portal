import { Webhook } from "svix";
import userModel from "../models/userModel.js";

const clerkWebHooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = new userModel({
          _id: data.id,
          email: data.email_addresses[0].email_address, // Fixed email access
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        });

        await userData.save(); // Fixed save method
        return res.status(201).json({ message: "User created successfully" });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address, // Fixed email access
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };

        await userModel.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ message: "User updated successfully" });
      }

      case "user.deleted": {
        await userModel.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "User deleted successfully" });
      }

      default:
        return res.status(400).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default clerkWebHooks;
