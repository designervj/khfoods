import { Editor } from "@/EditorComp/Editor";
import { type Locale } from "@/i18n/config";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const dynamic = "force-dynamic";

const EditorPage = async ({ params }) => {
  const param = await params

const payload = await getPayload({ config: configPromise });
  const page = await payload.findByID({
    collection: "pages",
    id: param.id,
  });


  return <Editor mode="edit" data={page} />;
};
export default EditorPage;
