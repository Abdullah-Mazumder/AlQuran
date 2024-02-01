import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SubWiseQuranSubState,
  readSubWiseQuranSubFromDb,
} from "src/redux/features/subjectWiseQuran/subject/subWiseQuranSubSlice";

const useGetSubjectWiseQuranSubject = () => {
  const dispatch = useDispatch();
  const { isLoading, subjects } = useSelector(
    (state: { quranSubjects: SubWiseQuranSubState }) => state.quranSubjects
  );

  useEffect(() => {
    dispatch(readSubWiseQuranSubFromDb() as any);
  }, []);

  return { isLoading, subjects };
};

export default useGetSubjectWiseQuranSubject;
