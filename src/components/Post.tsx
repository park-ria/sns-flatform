import React, { useState } from "react";
import styled from "styled-components";
import { IPost } from "./TimeLine";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  getDownloadURL,
  StorageErr,
  StorageErrorCode,
} from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  gap: 10px;
  padding: 20px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 200px;
  height: 100%;
  border-radius: 15px;
`;

const Video = styled.video`
  width: 100px;
  height: 100%;
  border-radius: 15px;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const PayLoad = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const DeleteButton = styled.button`
  background: #ff6347;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`;

const Post = ({ username, post, photo, video, userId, id }: IPost) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [editedPhoto, setEditedPhoto] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPost(e.target.value);
  };
  const handleCancle = () => {
    setIsEditing(false);
  };
  const handleEdit = async () => {
    setIsEditing(true);
  };

  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this post?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, `contents`, id));
      if (photo) {
        const photoRef = ref(storage, `contents/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <PayLoad>{post}</PayLoad>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
      </Column>
      <Column>
        {photo ? <Photo src={photo} /> : null}
        {video ? <Video src={video} /> : null}
      </Column>
    </Wrapper>
  );
};

export default Post;
