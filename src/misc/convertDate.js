export default function convertDate(date) {
  const toIsoDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return toIsoDate.toLocaleString('en-US', options);
}
