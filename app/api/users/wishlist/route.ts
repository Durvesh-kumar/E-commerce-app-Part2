import { connectToDB } from "@/lib/db/MongoDB";
import { User } from "@/lib/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest)=>{
    try {

        const { userId } = auth();

        if(!userId){
            return new NextResponse('Unautorized', {status: 401})
        }

        await connectToDB()

        const user = await User.findOne({clerkId: userId});

        if(!user){
            return new NextResponse('User not Found', {status: 400})
        }

        const {productId} = await req.json()

        if(!productId){
            return new NextResponse('Product not Found', {status: 400})
        }

        const isLike = user.wishlist.includes(productId)

        if(isLike){
            //Dislike
            user.wishlist = user.wishlist.filter((id: string)=> id !== productId)
        }else{
            // like
            user.wishlist.push(productId)
        }

        await user.save()

        return NextResponse.json(user, {status: 200})
        
    } catch (error) {
        console.log('[Wishlist_POST]', error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}