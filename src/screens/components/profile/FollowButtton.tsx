import { Button } from "../shared/SharedStyle";

interface IFollowProps {
  isFollowing: boolean;
  onFollowClick: () => void;
  onUnfollowClick: () => void;
}

function FollowButton({
  isFollowing,
  onFollowClick,
  onUnfollowClick,
}: IFollowProps) {
  return (
    <>
      {isFollowing ? (
        <Button onClick={onUnfollowClick}>Followed</Button>
      ) : (
        <Button $accent onClick={onFollowClick}>
          Follow
        </Button>
      )}
    </>
  );
}

export default FollowButton;
