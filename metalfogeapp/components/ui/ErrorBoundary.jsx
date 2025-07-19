'use client'

import React from 'react'
import { GiDeathSkull } from 'react-icons/gi'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Metal Forge Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <div className="text-center">
            <GiDeathSkull className="text-6xl text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4">
              METAL FORGE ERROR
            </h2>
            <p className="text-text-secondary mb-4">
              The underground has encountered an error. Please reload the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 uppercase font-bold tracking-wide transition-colors"
            >
              RELOAD FORGE
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
