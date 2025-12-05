import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="text-decoration-none">
      {/* Yahan wahi styling di hai jo header me thi taki match kare */}
      <span style={{ color: "#B68C5A", fontWeight: "bold", fontSize: "2rem" }}>
        Lawstick
      </span>
    </Link>
  );
};

export default Logo;