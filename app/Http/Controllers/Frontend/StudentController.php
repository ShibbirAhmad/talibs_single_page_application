<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Student ;
use App\Models\Result ;


class StudentController extends Controller
{


    public function register_student(Request $request){

       
        $validatedData = $request->validate([
            'course_id' => 'required',
            'fee' => 'required',
            'discount' => 'required',
            'dob' => 'required',
            'gender' => 'required',
            'total' => 'required',
            'email' => 'required|unique:students',
            'password' => 'required|min:6',
            'name' => 'required',
            'father_name' => 'required',
            'mother_name' => 'required',
            'address' => 'required',
            'our_payment_number' => 'required|digits:11',
            'payment_type' => 'required',
            'phone' => 'required|unique:students|digits:11',
            'transiction_id' => 'required',


        ]);
        $student = new Student();
        $student->course_id = $request->course_id;
        $student->fee = $request->fee;
        $student->discount = $request->discount;
        $student->total = $request->total;
        $student->name = $request->name;
        $student->student_id = 'TALIBS-'.rand(88,999);
        $student->father_name = $request->father_name;
        $student->mother_name = $request->mother_name;
        $student->gender = $request->gender;
        $student->dob = $request->dob;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->our_payment_number = $request->our_payment_number;
        $student->payment_type = $request->payment_type;
        $student->bkash_number = $request->bkash_number;
        $student->nogod_number = $request->nogod_number;
        $student->transiction_id = $request->transiction_id;
        $student->address = $request->address;
        $student->password = Hash::make($request->password);
        if ($request->hasFile('image')) {           
            $path = $request->file('image')->store('images/student', 'public');
            $student->image=$path ;
        }


        if ($student->save()) {

            return response()->json([
                'status' => 'SUCCESS',
                'message' => 'Registration successfully',
            ]);
        }

    }



    public function check_student_result($student_id){

           $result = Result::where('studentID',$student_id)->with(['student_info','course_name'])->first();
          if ($result) {

            return response()->json([
                'status' => 'OK',
                'result' => $result,
            ]);
          }else{
            return response()->json([
                'status' => 'FAIL',
                'message' => 'Sorry! no result found in this id.',
            ]); 
          }
     }




    public function login_student(Request $request){



    }










}
