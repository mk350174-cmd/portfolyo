import { redirect } from "next/navigation";

/** The work index lives on the home page; keep /work reachable rather than 404. */
export default function WorkIndexRedirect() {
  redirect("/#work");
}
