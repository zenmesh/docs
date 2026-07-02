import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Zen Mesh Docs" description="Documentation for Zen Mesh — secure webhook delivery to private networks and Kubernetes without inbound firewall exposure. Covers zen-lock secrets management, zen-agent enrollment, and Helm chart deployment.">
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
        </div>
      </main>
    </Layout>
  );
}
