interface ProfileParams {
    id?: string | null;
    name?: string;
  }
  
  export const useProfileParams = (): ProfileParams => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);
  
    const id = urlParams.get('id');
    const name = urlParams.get('name');
  
    return {
      id : id,
      name: name ? decodeURIComponent(name) : undefined,
    };
  };
  