import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
const execPromise = util.promisify(exec);

export async function POST() {
  try {
    // Chạy script convert. Có thể mất thời gian tuỳ số lượng video.
    // Script đã được sửa để chạy lệnh ffmpeg trực tiếp nếu ở trong Docker.
    const { stdout, stderr } = await execPromise('bash ./scripts/convert_hls.sh');
    return NextResponse.json({ success: true, output: stdout, stderr });
  } catch (error) {
    console.error("Convert error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
