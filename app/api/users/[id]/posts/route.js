import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, props) => {
  const params = await props.params;
  try {
    await connectDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
