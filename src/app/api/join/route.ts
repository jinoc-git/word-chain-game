import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const {} = await request.json();

  return NextResponse.json({
    success: false,
  });
};
