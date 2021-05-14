export const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
    if (!email) {
      return false;
    } else if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };
  export const validRequire = (text: string): boolean => {
    if (text) {
      return true;
    } else {
      return false;
    }
  }; 