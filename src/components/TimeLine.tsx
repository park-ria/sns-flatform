import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Post from "./Post";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  padding: 0 10px;
`;

export interface IPost {
  id: string;
  createdAt: number;
  photo?: string;
  video?: string;
  post: string;
  userId: string;
  username: string;
}
// 인터페이스는 보통 앞에 I를 써준다
// photo? 뒤에 물음표를 줘서 옵셔널 값이 돼어서 값이 없어도 됨

const TimeLine = () => {
  // <IPost[]>은 해당 배열의 값이 객체의 형태를 이기때문에 제네릭으로 표기
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "contents"),
        orderBy("createdAt", "desc"),
        limit(25) // 컨텐츠를 불러오는 데 25개까지 제약을 두겠다
      );

      // onSnapshot은 getDocs와 다르게 실시간으로 받아옴
      // unsubscribe는 firestore를 계속 쓰고 있지 않다고 알려주는 목적
      unsubscribe = await onSnapshot(postsQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { createdAt, photo, video, post, userId, username } =
            doc.data();
          return {
            id: doc.id,
            createdAt,
            photo,
            video,
            post,
            userId,
            username,
          };
        });
        setPosts(posts);
      });
    };

    fetchPosts();
    return () => {
      // 밑에는 unsubscribe가 있으면 실행시켜주라는 명령어
      // 실시간으로 가져온 값이 있으면=> unsubscribe 더 이상 firebase가 쓰고 있지 않다고 unsubscribe를 씀
      unsubscribe && unsubscribe();
    }; // return을 써서 언마운트를 시켜 줌
    // 언마운트가 됐을 때 실시간으로 업데이트가 되고 있지 않다고 unscribe를 선언해 줌
  }, []);
  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Wrapper>
  );
};

export default TimeLine;
