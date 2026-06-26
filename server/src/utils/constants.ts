export const ALLOWED_USER_EDITS = ["userName", "avatarUrl", "age", "gender"];

export const stylePrompts = {
  "Bold & Graphic":
    "high-impact YouTube thumbnail, bold oversized typography, vibrant high-saturation colors, expressive human reaction, exaggerated emotion, dramatic shadows and highlights, strong contrast, clean subject isolation, clickbait composition, cinematic lighting, ultra-sharp focus",

  "Tech/Futuristic":
    "futuristic YouTube thumbnail, sleek UI overlays, holographic interfaces, glowing neon accents, cyberpunk aesthetic, dark background with luminous elements, high-tech atmosphere, sharp rim lighting, sci-fi composition, digital grid and data visuals",

  Minimalist:
    "minimalist YouTube thumbnail, ultra-clean layout, strong focal subject, large negative space, limited color palette, subtle shadows, modern flat design, elegant composition, clear hierarchy, distraction-free visual",

  Photorealistic:
    "ultra photorealistic thumbnail, natural lighting, DSLR-quality image, realistic skin texture, candid human expression, shallow depth of field, cinematic framing, soft bokeh background, lifestyle realism, high dynamic range",

  Illustrated:
    "high-quality illustrated thumbnail, stylized characters, bold outlines, vibrant color fills, dynamic poses, expressive cartoon emotion, vector art style, clean shading, storytelling composition, playful and engaging visual",
};

export const colorSchemeDescriptions = {
  vibrant:
    "highly saturated vibrant colors, bold contrast, energetic palette, attention-grabbing tones optimized for click-through",

  sunset:
    "warm sunset gradient, orange pink purple blend, cinematic lighting, soft glow, emotional and dramatic atmosphere",

  forest:
    "earthy green tones, natural palette, organic textures, calm and grounded mood, fresh environment",

  neon: "intense neon glow, electric blue and hot pink highlights, cyberpunk lighting, dark background with luminous contrast",

  purple:
    "rich purple and magenta tones, modern aesthetic, stylish and premium feel, smooth gradients and soft glow",

  monochrome:
    "black and white high contrast, dramatic lighting, sharp shadows, timeless and bold minimal aesthetic",

  ocean:
    "cool blue and teal palette, fresh aquatic tones, clean gradients, calming and modern atmosphere",

  pastel:
    "soft pastel tones, low saturation colors, smooth gradients, friendly and approachable aesthetic",
};

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #FF6A1C;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 10 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;
export const subscriptionType = {
  Basic: "599",
  Pro: "1199",
  Enterprise: "2599",
};
