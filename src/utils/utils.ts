export const maskEmail = (email: string | undefined) => {
  if (!email) return null;
  const [name, domain] = email.split('@');

  const visiblePart = name.slice(0, 1);
  const hiddenPart = '*'.repeat(name.length - 1).slice(0, 6);

  return `${visiblePart}${hiddenPart}@${domain}`;
};
