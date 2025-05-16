'use client'

import React from 'react'

export function Badge({
  variant = 'default',
  className,
  children,
}: {
  variant?: 'default' | 'secondary'
  className?: string
  children: React.ReactNode
}) {
  const base = 'inline-block px-2 py-1 text-sm font-medium rounded-full'
  const colors =
    variant === 'secondary'
      ? 'bg-gray-200 text-gray-800'
      : 'bg-blue-100 text-blue-800'
  return (
    <span className={`${base} ${colors} ${className || ''}`.trim()}>
      {children}
    </span>
  )
}