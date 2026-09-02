import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const faqItems = [
  {
    q: 'How does Zen Mesh deliver webhooks to private networks without opening inbound ports?',
    a: 'Zen Mesh uses an outbound-only Edge Plane. zen-egress in your network establishes an outbound connection to Zen Mesh data plane for delivery. zen-agent handles enrollment and configuration sync but never carries customer payloads. No inbound firewall rules, no VPN, no reverse proxy.',
  },
  {
    q: 'What security controls protect webhook delivery?',
    a: 'mTLS, SPIFFE/SPIRE workload identity, and HMAC payload verification on every data-plane path. External provider webhooks use provider-specific signature verification at ingress. See the security documentation for the full model.',
  },
  {
    q: 'Can I use Zen Mesh with Kubernetes?',
    a: 'Yes. Deploy the zen-agent as a Helm chart on your cluster. The Edge Plane integrates with Kubernetes and supports zen-egress for delivering to services behind NAT or firewall.',
  },
  {
    q: 'Which webhook sources does Zen Mesh support?',
    a: 'Stripe, GitHub, Twilio, Shopify, and any custom HTTP webhook source. Zen Mesh validates signatures from supported providers, and provides signature verification guidance for custom sources.',
  },
  {
    q: 'Is Zen Mesh production-ready?',
    a: 'Individual capabilities carry per-item status (WIRED, AUTOMATED_TESTED, etc.) documented in the evidence system. Review the Current Status page for per-capability maturity. Zen Mesh does not claim production-live availability as a global platform.',
  },
  {
    q: 'What is the pricing model?',
    a: 'Free Forever tier available. Pro Early Bird with 6-month free trial. See zen-mesh.io/pricing for details.',
  },
];

export default function Home() {
  return (
    <Layout
      title="Zen Mesh Docs"
      description="Documentation for Zen Mesh — secure webhook delivery to private networks and Kubernetes without inbound firewall exposure. Outbound-only Edge Plane. mTLS, SPIFFE/SPIRE, HMAC on every data-plane path."
    >
      <main className={styles.hero}>
        <div className={styles.container}>
          <h1>Zen Mesh <span className={styles.accent}>Documentation</span></h1>
          <p className={styles.tagline}>
            Secure webhook delivery to private networks — without opening firewalls. Free Forever. Pro Early Bird with 6-month free trial available.
          </p>
          <div className={styles.products}>
            <Link to="/docs" className={styles.card}>
              <h2>🪝 zen-mesh</h2>
              <p>Webhook delivery platform. Three-plane architecture, outbound-only, mTLS everywhere.</p>
              <span className={styles.cta}>Read docs →</span>
            </Link>
            <Link to="/docs/zen-mesh/api/swagger" className={styles.card}>
              <h2>📚 API Reference</h2>
              <p>Interactive Swagger UI for the Zen Mesh Customer Control API (OAS 3.1) — try all operations live.</p>
              <span className={styles.cta}>Open API console →</span>
            </Link>
            <Link to="/zen-lock" className={styles.card}>
              <h2>🔐 zen-lock</h2>
              <p>Secret management built into Zen Mesh. Enrollment credentials and HMAC signing keys encrypted at rest with age. Not zero-knowledge in the cryptographic sense.</p>
              <span className={styles.cta}>Read docs →</span>
            </Link>
            <Link to="/helm-charts" className={styles.card}>
              <h2>⚙️ Helm Charts</h2>
              <p>Official charts for deploying zen-agent, zen-suite, and the full Zen Mesh edge stack.</p>
              <span className={styles.cta}>Read docs →</span>
            </Link>
            <Link to="/zen-gc" className={styles.card}>
              <h2>🧹 Zen-GC</h2>
              <p>Apache-2.0 Kubernetes garbage-collection controller for declarative TTL cleanup and lifecycle hygiene.</p>
              <span className={styles.cta}>Read docs →</span>
            </Link>
          </div>
          <div className={styles.links}>
            <Link href="https://zen-mesh.io">zen-mesh.io</Link>
            <Link href="https://github.com/zenmesh/helm-charts">Helm Charts</Link>
            <Link href="https://github.com/zenmesh">GitHub</Link>
            <Link href="https://zenmeshinc.slack.com/">Slack</Link>
          </div>
          <section className={styles.faq}>
            <h2>Frequently Asked Questions</h2>
            {faqItems.map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.q}</summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </section>
        </div>
      </main>
    </Layout>
  );
}
