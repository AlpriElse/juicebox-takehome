import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import NewsModal from "./NewsModal";

const NewsCard = ({ article }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card md={{ minWidth: 400 }} style={{ marginBottom: "1em" }}>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            {article.title}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <span dangerouslySetInnerHTML={{ __html: article.author }} />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            See article
          </Button>
        </CardActions>
      </Card>
      <NewsModal
        open={open}
        handleClose={handleClose}
        articleUrl={article.url}
      />
    </>
  );
};

export default NewsCard;
