import React from 'react'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>AI Medellin</h1>
        <p>
          AI-powered event platform for Medellin with Vercel integration
        </p>
      </div>

      <div className={styles.center}>
        <h2>Vercel MCP Integration</h2>
        <p>This platform uses Vercel MCP Server to enable AI assistants to manage Vercel projects and deployments.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Project Management</h2>
          <p>Create, list, and manage Vercel projects through AI assistants.</p>
        </div>

        <div className={styles.card}>
          <h2>Deployments</h2>
          <p>Automate deployments and track deployment status with AI.</p>
        </div>

        <div className={styles.card}>
          <h2>Domain Management</h2>
          <p>Configure domains, DNS records, and certificates.</p>
        </div>

        <div className={styles.card}>
          <h2>Environment Variables</h2>
          <p>Securely manage environment variables across projects.</p>
        </div>
      </div>
    </main>
  )
}