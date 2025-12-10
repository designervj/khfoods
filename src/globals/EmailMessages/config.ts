import { type GlobalConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const EmailMessages: GlobalConfig = {
  slug: "emailMessages",
  label: {
    en: "Email Messages",

    zh: "电子邮件消息"
  },
  access: {
    read: authenticated,
    update: authenticated
  },
  admin: {
    group: {
      en: "Shop settings",

      zh: "商店设置"
    }
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "smtp",
          label: {
            en: "SMTP",

            zh: "SMTP"
          },
          fields: [
            {
              name: "host",
              type: "text",
              required: true,
              label: {
                en: "Host",

                zh: "主机"
              }
            },
            {
              name: "port",
              type: "number",
              required: true,
              label: {
                en: "SMTP Port",

                zh: "SMTP端口"
              }
            },
            {
              name: "secure",
              type: "checkbox",
              label: {
                en: "Secure",

                zh: "安全"
              },
              required: true,
              defaultValue: false
            },
            {
              name: "user",
              type: "text",
              required: true,
              label: {
                en: "User",

                zh: "用户"
              }
            },
            {
              name: "password",
              type: "text",
              required: true,
              label: {
                en: "Password",

                zh: "密码"
              }
            },
            {
              name: "fromEmail",
              type: "text",
              required: true,
              label: {
                en: "From Email",

                zh: "发件人邮箱"
              }
            },
          ]
        },
        {
          name: "messages",
          label: {
            en: "Messages",

            zh: "消息"
          },
          fields: [
            {
              name: "logo",
              type: "upload",
              label: {
                en: "Logo",

                zh: "标志"
              },
              relationTo: "media"
            },
            {
              name: "additionalText",
              type: "textarea",
              label: {
                en: "Additional text",

                zh: "附加文本"
              }
            },
            {
              name: "template",
              type: "select",
              required: true,
              defaultValue: "default",
              options: [{ value: "default", label: { en: "Default", zh: "默认" } },
                { value: "template 1", label: { en: "template 1", zh: "默认" } }
              ]
            },
          ]
        },
      ]
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal]
  }
};
