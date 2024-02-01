const htmlToText = (htmlString: string): string => {
  const regex = /<[^>]*>/g;
  return htmlString.replace(regex, "");
};

export default htmlToText;
