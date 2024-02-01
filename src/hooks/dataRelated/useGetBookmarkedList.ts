import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Condition } from "src/redux/features/bookmarkList/bookmarkListApi";
import {
  BookmarkedListState,
  readBookmarkedListFromDb,
} from "src/redux/features/bookmarkList/bookmarkListSlice";

const useGetBookmarkedList = (conditions: Condition[]) => {
  const dispatch = useDispatch();
  const { isLoading, verses } = useSelector(
    (state: { bookmarkedList: BookmarkedListState }) => state.bookmarkedList
  );

  useEffect(() => {
    dispatch(readBookmarkedListFromDb(conditions) as any);
  }, [conditions]);

  return { isLoading, bookmarkedList: verses };
};

export default useGetBookmarkedList;
