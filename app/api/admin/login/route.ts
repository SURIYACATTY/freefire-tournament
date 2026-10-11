import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { ADMIN_COOKIE, createSessionToken } from '@/lib/admin-session';
export const runtime='nodejs';
export async function POST(req:Request){try{const {password}=await req.json(),expected=process.env.ADMIN_PASSWORD;if(!expected)return NextResponse.json({error:'ADMIN_PASSWORD is not configured.'},{status:500});const a=Buffer.from(String(password??'')),b=Buffer.from(expected);if(a.length!==b.length||!timingSafeEqual(a,b))return NextResponse.json({error:'Incorrect admin password.'},{status:401});const res=NextResponse.json({ok:true});res.cookies.set(ADMIN_COOKIE,createSessionToken(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:28800});return res}catch{return NextResponse.json({error:'Invalid request.'},{status:400})}}
