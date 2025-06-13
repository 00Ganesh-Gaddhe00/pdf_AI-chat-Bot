import React from 'react'

function chatTofilePage({
    params: { id },
  }: {
    params: {
      id: string;
    };
  }) {
  return (
    <div>chatTofilePage: {id}</div>
  )
}

export default chatTofilePage