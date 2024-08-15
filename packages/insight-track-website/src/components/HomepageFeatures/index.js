import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Easy to Use",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        InsightTrack delivers instant, actionable insights into customer
        behavior, enabling small teams to make data-driven decisions quickly.
        Stay ahead of the curve and drive growth by aligning your product with
        real-time customer needs.
      </>
    ),
  },
  {
    title: "Efficient Resource Utilization with Seamless Integrations",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Optimize your team's efficiency by integrating InsightTrack with your
        existing toolset. Customizable alerts ensure that your team focuses on
        the metrics that matter, saving time and preventing small issues from
        becoming growth blockers.
      </>
    ),
  },
  {
    title: "Simplified Dashboards for Strategic Clarity",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Designed with growth-focused organizations in mind, our
        stakeholder-friendly dashboards simplify complex data, ensuring that
        every team member—technical or non-technical—can contribute to strategic
        decisions that propel your business forward.
      </>
    ),
  },
  {
    title: "Collaborative Development for Customer-Centric Innovation",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        InsightTrack fosters a collaborative environment where small teams can
        share insights and focus on customer-centric improvements. This enables
        rapid iteration and innovation, helping your organization grow by
        continuously enhancing the customer experience.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
