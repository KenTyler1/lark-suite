import axios from "axios";
import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "user_id",
      type: "text",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "en_name",
      type: "text",
    },
    {
      name: "nickname",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "mobile_visible",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "gender",
      type: "number",
      required: true,
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "country",
      type: "text",
    },
    {
      name: "work_station",
      type: "text",
    },
    {
      name: "join_time",
      type: "number",
    },
    {
      name: "employee_no",
      type: "text",
    },
    {
      name: "employee_type",
      type: "number",
    },
    {
      name: "job_title",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const body = {
          app_id: "cli_a66a448ff7b99010",
          app_secret: "hMeIegTPwcPw8jdPiTC8iIofKcGaG1G6",
        };

        const getToken: any = await axios.post(
          "https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal",
          body
        );

        console.log("Token: ", getToken.data.tenant_access_token);

        if (getToken.data.msg === "ok") {
          try {
            const response = await axios.post(
              `https://open.larksuite.com/open-apis/contact/v3/users?department_id_type=department_id&user_id_type=user_id`,
              {
                user_id: doc.user_id,
                name: doc.name,
                en_name: doc.en_name,
                nickname: doc.nickname,
                email: doc.email,
                mobile_visible: doc.mobile_visible,
                gender: doc.gender,
                city: doc.city,
                country: doc.country,
                work_station: doc.work_station,
                join_time: doc.join_time,
                employee_no: doc.employee_no,
                employee_type: doc.employee_type,
                department_ids: [0],
                job_title: doc.job_title,
              },
              {
                headers: {
                  Authorization: `Bearer ${getToken.data.tenant_access_token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("API Response:", response.data);
          } catch (error) {
            console.error("Error calling Lark API:", error);
          }
        }
      },
    ],
  },
};

export default Users;
