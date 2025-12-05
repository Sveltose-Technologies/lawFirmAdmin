import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import Image from "next/image";

const Blog = ({ image, title, subtitle, text, color }) => {
  return (
    <Card>
      {/* 
        FIX: Next.js Image component needs width and height when using string paths.
        style={{ width: "100%", height: "auto" }} ensures it stays responsive.
      */}
      <Image 
        alt="Card image cap" 
        src={image} 
        width={500} 
        height={350} 
        style={{ width: "100%", height: "auto" }}
      />
      <CardBody className="p-4">
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle className="text-muted">{subtitle}</CardSubtitle>
        <CardText className="mt-3">{text}</CardText>
        <Button color={color}>Read More</Button>
      </CardBody>
    </Card>
  );
};

Blog.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Blog;