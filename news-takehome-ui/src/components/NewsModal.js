import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ContentWithNamedEntities from "./ContentWithNamedEntities";

import { getNewsContent } from "../api/news";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "2em",
};

const LoadingState = (
  <Typography id="modal-modal-title" variant="h6" component="h2">
    Loading... (this can take up to 15s)
  </Typography>
);

const NewsModal = ({ articleUrl, open, handleClose }) => {
  const [articleContent, setArticleContent] = useState(null);
  useEffect(() => {
    if (open && articleContent === null) {
      getNewsContent(articleUrl).then((res) => {
        console.log(res);
        setArticleContent(res.payload);
      });
    }
  }, [articleUrl, open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box style={style}>
        {articleContent === null ? (
          LoadingState
        ) : (
          <ContentWithNamedEntities
            serializedContentAndNamedEntities={
              articleContent.serializedContentAndNamedEntities
            }
          />
        )}
      </Box>
    </Modal>
  );
};

export default NewsModal;
