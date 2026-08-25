import { Composition } from "remotion";

import { Promo, promoDurationInFrames } from "./Promo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Promo"
      component={Promo}
      durationInFrames={promoDurationInFrames}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
