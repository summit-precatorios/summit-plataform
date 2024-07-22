import { jwtDecode } from "jwt-decode";


export async function getCurrentUser(token?: string) {

    if (token) {

        const tokenDecoded: any = await jwtDecode(token as string)

        return tokenDecoded.payload.document ?? undefined
    }

    return

}

