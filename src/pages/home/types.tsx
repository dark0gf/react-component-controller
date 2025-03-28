import React from "react";

export type TProfile = {
    username: string;
    children?: (u: string | null) => React.ReactNode | null
}
