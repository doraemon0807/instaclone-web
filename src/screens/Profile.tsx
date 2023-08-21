import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import {
  ApolloCache,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { styled } from "styled-components";
import Avatar from "./components/shared/Avatar";
import { useState } from "react";
import Separator from "./components/shared/Separator";
import PhotoGallery from "./components/profile/PhotoGallery";
import { useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";
import { Button } from "./components/shared/SharedStyle";
import PageTitle from "./components/shared/PageTitle";
import { UnfollowUserMutation, User } from "../gql/graphql";
import useUser from "./hooks/useUser";

const Container = styled.div`
  margin-top: 5px;
`;
const ProfileContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const ProfileHeader = styled.div`
  display: flex;
`;

const ProfileAvatar = styled.div`
  margin-right: 26px;
`;
const ProfileInfo = styled.div`
  margin-top: 10px;
  width: 100%;
`;
const ProfileInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProfileUsername = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;
const ProfileActions = styled.div`
  width: 100%;
  display: flex;
  div {
    padding: 10px;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const ProfileName = styled.h4`
  font-weight: 500;
  margin-bottom: 4px;
`;
const ProfileBio = styled.span`
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ProfileStats = styled.div`
  margin: 14px 0px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ProfileStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    &:first-child {
      font-weight: 500;
      margin-bottom: 4px;
    }
  }
`;

const PhotoContainer = styled.div``;
const PhotoHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const PhotoMode = styled.div<{ $active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0px;
  border-top: 1px solid
    ${(props) => (props.$active ? props.theme.fontColor : "transparent")};
`;
const PhotoWrapper = styled.div``;

interface IProfileParams {
  username: string;
}

interface IUnfollowUserUpdateProps {
  data?: UnfollowUserMutation | null;
}

export type IPostModeParams = "posts" | "saved" | "tagged";

const SEE_PROFILE_QUERY = graphql(`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ok
      error
      profile {
        ...UserFragment
        createdAt
        firstName
        lastName
        bio
        totalFollowing
        totalFollowers
        isFollowing
        isMe
        photoCount
        fullName
        photos {
          ...PhotoFragment
        }
        savedPhotos {
          ...PhotoFragment
        }
        taggedPhotos {
          ...PhotoFragment
        }
      }
    }
  }
`);

const FOLLOW_USER_MUTATION = graphql(`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`);

const UNFOLLOW_USER_MUTATION = graphql(`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`);

function Profile() {
  //grab username of the current profile from params
  const { username } = useParams<Readonly<IProfileParams>>();

  //grab userData of logged in user
  const { data: userData } = useUser();

  //Apollo client allows you to access cache
  const client = useApolloClient();

  //query function to fetch profile info
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: username!,
    },
  });

  //function to update followUser cache
  //method 1: update
  const followUserUpdate = (
    cache: ApolloCache<User>,
    result: IUnfollowUserUpdateProps
  ) => {
    if (!result.data) {
      return;
    }
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    //modify cache of the profile user
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });

    //modify cache of the logged in user
    if (!userData?.me.profile) {
      return;
    }
    const {
      me: {
        profile: { username: myUsername },
      },
    } = userData;

    cache.modify({
      id: `User:${myUsername}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };

  // mutation function for following user
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username: username!,
    },
    update: followUserUpdate,
  });

  //function to update unfollowUser cache
  //method 2: onCompleted + Apollo client
  const unfollowUserCompleted = (data: any) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;

    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });
    //modify cache of the logged in user
    if (!userData?.me.profile) {
      return;
    }
    const {
      me: {
        profile: { username: myUsername },
      },
    } = userData;

    cache.modify({
      id: `User:${myUsername}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };
  // mutation function for unfollowing user
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username: username!,
    },
    onCompleted: unfollowUserCompleted,
  });

  const onFollowClick = () => {
    unfollowUser();
  };

  const onUnfollowClick = () => {
    followUser();
  };

  //states to change modes for photo gallery
  const [postMode, setPostMode] = useState<IPostModeParams>("posts");

  const navigate = useNavigate();

  return (
    <Container>
      <PageTitle
        title={
          loading
            ? "Loading..."
            : `${data?.seeProfile.profile?.username}'s Profile`
        }
      />
      <ProfileContainer>
        <ProfileHeader>
          <ProfileAvatar>
            <Avatar url={data?.seeProfile.profile?.avatar} size="lg" />
          </ProfileAvatar>
          <ProfileInfo>
            <ProfileInfoHeader>
              <ProfileUsername>{username}</ProfileUsername>
              {data?.seeProfile.profile?.isMe ? (
                <ProfileActions>
                  <Button>Edit Profile</Button>
                  <Button onClick={() => logUserOut(navigate)}>Log Out</Button>
                </ProfileActions>
              ) : (
                <ProfileActions>
                  {data?.seeProfile.profile?.isFollowing ? (
                    <Button onClick={onFollowClick}>Followed</Button>
                  ) : (
                    <Button $accent onClick={onUnfollowClick}>
                      Follow
                    </Button>
                  )}
                  <Button>Message</Button>
                </ProfileActions>
              )}
            </ProfileInfoHeader>
          </ProfileInfo>
        </ProfileHeader>
        <ProfileDetail>
          <ProfileName>{data?.seeProfile.profile?.fullName}</ProfileName>
          <ProfileBio>{data?.seeProfile.profile?.bio}</ProfileBio>
        </ProfileDetail>
      </ProfileContainer>
      <Separator />
      <ProfileStats>
        <ProfileStat>
          {data?.seeProfile.profile?.photoCount === 1 ? (
            <>
              <span>1</span>
              <span>post</span>
            </>
          ) : (
            <>
              <span>{data?.seeProfile.profile?.photoCount}</span>
              <span>post</span>
            </>
          )}
        </ProfileStat>
        <ProfileStat>
          {data?.seeProfile.profile?.totalFollowers === 1 ? (
            <>
              <span>1</span>
              <span>follower</span>
            </>
          ) : (
            <>
              <span>{data?.seeProfile.profile?.totalFollowers}</span>
              <span>followers</span>
            </>
          )}
        </ProfileStat>
        <ProfileStat>
          {data?.seeProfile.profile?.totalFollowing === 1 ? (
            <>
              <span>1</span>
              <span>following</span>
            </>
          ) : (
            <>
              <span>{data?.seeProfile.profile?.totalFollowing}</span>
              <span>followings</span>
            </>
          )}
        </ProfileStat>
      </ProfileStats>
      <Separator />
      <PhotoContainer>
        <PhotoHeader>
          <PhotoMode
            $active={postMode === "posts"}
            onClick={() => setPostMode("posts")}
          >
            Posts
          </PhotoMode>
          {data?.seeProfile.profile?.isMe && (
            <PhotoMode
              $active={postMode === "saved"}
              onClick={() => setPostMode("saved")}
            >
              Saved
            </PhotoMode>
          )}
          <PhotoMode
            $active={postMode === "tagged"}
            onClick={() => setPostMode("tagged")}
          >
            Tagged
          </PhotoMode>
        </PhotoHeader>
        <PhotoWrapper>
          {postMode === "posts" && data?.seeProfile.profile?.photos && (
            <PhotoGallery
              mode={postMode}
              isMe={data?.seeProfile.profile?.isMe}
              photos={data.seeProfile.profile.photos}
            />
          )}
          {postMode === "saved" && data?.seeProfile.profile?.savedPhotos && (
            <PhotoGallery
              mode={postMode}
              isMe={data?.seeProfile.profile?.isMe}
              photos={data.seeProfile.profile.savedPhotos}
            />
          )}
          {postMode === "tagged" && data?.seeProfile.profile?.taggedPhotos && (
            <PhotoGallery
              mode={postMode}
              isMe={data?.seeProfile.profile?.isMe}
              photos={data.seeProfile.profile.taggedPhotos}
            />
          )}
          {/* <PhotoGrid>
            {postMode === "posts" &&
              //If Photo doesn't exist
              (data?.seeProfile.profile?.photos &&
              data?.seeProfile.profile.photos.length > 0 ? (
                data?.seeProfile.profile?.photos.map((photo) => (
                  <PhotoItem key={photo?.id} src={photo?.file} />
                ))
              ) : //If photo doesn't exist and it's my profile
              data?.seeProfile.profile?.isMe ? (
                <div></div>
              ) : (
                <div></div>
              ))}
            {postMode === "saved" &&
              (data?.seeProfile.profile?.savedPhotos &&
              data?.seeProfile.profile.savedPhotos.length > 0 ? (
                data?.seeProfile.profile?.savedPhotos.map((photo) => (
                  <PhotoItem key={photo?.id} src={photo?.file} />
                ))
              ) : data?.seeProfile.profile?.isMe ? (
                <div></div>
              ) : (
                <div></div>
              ))}
            {postMode === "tagged" &&
              (data?.seeProfile.profile?.taggedPhotos &&
              data?.seeProfile.profile.taggedPhotos.length > 0 ? (
                data?.seeProfile.profile?.taggedPhotos.map((photo) => (
                  <PhotoItem key={photo?.id} src={photo?.file} />
                ))
              ) : data?.seeProfile.profile?.isMe ? (
                <div></div>
              ) : (
                <div></div>
              ))}
          </PhotoGrid> */}
        </PhotoWrapper>
      </PhotoContainer>
    </Container>
  );
}

export default Profile;
