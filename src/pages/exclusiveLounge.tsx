import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"

const pageStyles = {
  color: "#232129",
  padding: "20px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 32,
  maxWidth: 600,
  textAlign: "center" as "center",
}

const paragraphStyles = {
  marginBottom: 48,
  maxWidth: 600,
  textAlign: "center" as "center",
}

const ExclusiveLoungeModal: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main style={pageStyles}>
        <h1 style={headingStyles}>Welcome to the Exclusive Lounge</h1>
        <p style={paragraphStyles}>
          Hello world! This is the exclusive lounge area. More exciting content coming soon.
        </p>
      </main>
    </Layout>
  )
}

export default ExclusiveLoungeModal

export const Head: HeadFC = () => <title>Exclusive Lounge</title>