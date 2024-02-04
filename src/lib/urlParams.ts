export const useProfileParams = () => {
  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(currentUrl);

  const profileId = urlParams.get('profileId');
  const profileName = urlParams.get('profileName');

  return {
    profileId : profileId ? parseInt(profileId , 10): undefined,
    profileName: profileName ? decodeURIComponent(profileName) : undefined,
  };
};
  