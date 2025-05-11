import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  return NextResponse.json({
    success: true,
  });
};
