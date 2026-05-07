export const getWhatsAppLink = (phone: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

export const generatePropertyMessage = (propertyTitle: string, id: string, type: string) => {
  if (type === 'Boarding') {
    return `Hi, I found your student boarding listing on ZimProperty: "${propertyTitle}". Is this room still available?`;
  }
  return `Hi, I'm interested in the property I saw on ZimProperty: "${propertyTitle}" (Ref: ${id}). Could you please share more details?`;
};
