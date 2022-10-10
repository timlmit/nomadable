export const isEmail = (str: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(str);
};

export const isPassword = (pw: string, minLenth: number): boolean => {
  return (
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    // /[^A-Za-z0-9]/.test(pw) &&
    pw.length >= minLenth
  );
};

export const isUrl = (str: string): boolean => {
  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};
