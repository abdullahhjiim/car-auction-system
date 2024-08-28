const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

const ShareOnMessenger = ({ url }) => {
  const messengerShareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
    url
  )}&app_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(url)}`;

  return (
    <a
      href={messengerShareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 text-white rounded"
    >
      Share on Messenger
    </a>
  );
};

export default ShareOnMessenger;
