import { FrameActionPayload, hexStringToUint8Array } from ".";
import { FrameActionMessage } from "@farcaster/core";

export async function validateFrameMessage(body: FrameActionPayload): Promise<{
  isValid: boolean;
  message: FrameActionMessage | undefined;
}> {
  const hubBaseUrl =
    process.env.FRAME_HUB_HTTP_URL ||
    process.env.HUB_HTTP_URL ||
    "https://nemes.farcaster.xyz:2281";

  const validateMessageResponse = await fetch(
    `${hubBaseUrl}/v1/validateMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: hexStringToUint8Array(body.trustedData.messageBytes),
    }
  );

  const validateMessageJson = await validateMessageResponse.json();
  return {
    isValid: validateMessageJson.valid as boolean,
    message: validateMessageJson.message as FrameActionMessage,
  };
}
