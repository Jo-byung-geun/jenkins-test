import React, { useState,useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import List from '../../list/List';
// import post,{getPosts} from '../../modules/post';
import axios from 'axios';
import {getMyPagePosts} from '../../../services/PostService';
function MyPage(props) {
  const Dispatch = useDispatch();
  const [bookmarkList, setBookmarkList] = useState([]);
  const [mypostList, setMypostList] = useState([]);
  const [emptyBookmarkList,setEmptyBookmarkList]=useState([]);
  const [emptyMyPostList,setEmptyMyPostList]=useState([]);


  useEffect(()=>{
    //Dispatch(getPosts());

    getMyPagePosts().then((response)=>{
        console.log('mypage response',response);
        if(response.bookmarks.length===0) setEmptyBookmarkList(true);
        else if(response.bookmarks.length>0) setEmptyBookmarkList(false);
        
        if(response.myposts.length===0) setEmptyMyPostList(true);
        else if(response.myposts.length>0) setEmptyMyPostList(false);

        setBookmarkList(response.bookmarks);
        setMypostList(response.myposts);

        console.log('empty bookmark',emptyBookmarkList);
        console.log('empty my posts',emptyMyPostList);
    });
    
  },[]);

  // 북마크 취소 즉시 반영
  const deleteBookmark=(itemId)=>{
    console.log('mypage - deleteBookmark - itemId',itemId);
    const afterDeleteItemList=bookmarkList.filter((it)=>it.postId!==itemId);
    setBookmarkList(afterDeleteItemList);
  }

  // 게시글 삭제 즉시 반영
  const deletePost=(itemId)=>{
    const afterDeleteItemList=mypostList.filter((it)=>it.postId!==itemId);
    setMypostList(afterDeleteItemList);
  }

  
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="px-5 flex flex-col md:h-full pt-5">
          <div class='md:h-fit'>
              <p class="text-2xl font-bold text-gray-900">즐겨찾기</p>
              {emptyBookmarkList&&<div className="h-96 flex justify-center items-center text-2xl text-bold text-sky-400">마음에 드는 게시물을 즐겨찾기 해보세요!</div>}
              {bookmarkList&&<List items={bookmarkList} case_={1} type='post' deleteBookmark={deleteBookmark}/>}
          </div>

          <div class='md:h-fit'>
              <p class="text-2xl font-bold text-gray-900">내가 작성한 게시물</p>
              {emptyMyPostList&&<div className="h-96 flex justify-center items-center text-2xl text-bold text-sky-400">공유하고 싶은 설문지를 커뮤니티에 공유해보세요!</div>}
              {mypostList&&<List items={mypostList} case_={2} type='post' deletePost={deletePost}/>}
          </div>
          
        </div>
      </div>
    )    
}

export default MyPage;