import { useUiStore } from "../store/useUiStore";

export const useStartLanding = () => {
  const { isLandingStarted, startLanding } = useUiStore();

  return { isLandingStarted, startLanding };
};
