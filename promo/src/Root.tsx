import { Composition } from "remotion";

import { Promo, promoDurationInFrames } from "./Promo";
import { Tour, tourDurationInFrames } from "./Tour";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={promoDurationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Tour"
        component={Tour}
        durationInFrames={tourDurationInFrames}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
