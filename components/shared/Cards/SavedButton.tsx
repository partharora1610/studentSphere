"use client";

import { saveQuestion, unsaveQuestion } from "@/lib/actions/question.action";
import { BookmarkCheck, BookmarkMinus } from "lucide-react";
import React from "react";

const SavedButton = ({ saved, userId, questionId }: any) => {
  return (
    <>
      {saved ? (
        <BookmarkCheck onClick={() => unsaveQuestion({ userId, questionId })} />
      ) : (
        <BookmarkMinus onClick={() => saveQuestion({ userId, questionId })} />
      )}
    </>
  );
};

export default SavedButton;
