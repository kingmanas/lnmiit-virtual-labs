import { Stack, Chip } from "@mui/material";
import { React } from "react";
import "./css/profile.css";
import "@fontsource/roboto";
import { format } from "date-fns";

export const dummy_profile_page = [
  {
    name: "Manas Singh",
    tags: ["os", "cp", "webdev", "cn"],
    last_online: Date(1637878505850),
    image_url:
      "https://images.pexels.com/photos/10058566/pexels-photo-10058566.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  },
];

export default function Profile(props) {
  return (
    <div className="profile">
      <div className="user-info">
        <ul>
          <li style={{ fontFamily: "Roboto", fontSize: "2em" }}>
            {props.name}
          </li>
          <li>
            <Stack direction="row" spacing={2}>
              {props.tags.map((tag) => {
                return <Chip label={"#" + tag + " "} color="secondary" />;
              })}
            </Stack>
          </li>
          <li>
            Last Seen: {format(new Date(props.last_online), "MMMM do, yyyy H:mma")}
          </li>
        </ul>
      </div>
      <div className="profile-image">
        <img src={props.image_url} />
      </div>
    </div>
  );
}

export function FarziUser() {
  const pp = dummy_profile_page[0];
  return (
    <Profile
      name={pp.name}
      tags={pp.tags}
      last_online={pp.last_online}
      image_url={pp.image_url}
    />
  );
}
