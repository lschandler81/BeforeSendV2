import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    console.log("=== API Route Called ===");
    
    // Parse request body
    const { emailText, lensType } = await request.json();
    console.log("Request body parsed:", { emailText: emailText?.substring(0, 50), lensType });

    if (!emailText || !lensType) {
      return NextResponse.json(
        { error: "emailText and lensType are required" },
        { status: 400 }
      );
    }

    // Verify API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("API key exists:", !!apiKey);
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Read the Master Vault file from root
    console.log("Reading Master Vault file...");
    const vaultPath = path.join(process.cwd(), "BeforeSend_Master_Vault.md");
    console.log("Vault path:", vaultPath);
    const masterVault = fs.readFileSync(vaultPath, "utf-8");
    console.log("Master Vault loaded, length:", masterVault.length);

    // Initialize Gemini with 2026 stable production model
    console.log("Initializing Gemini...");
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-2.5-flash - the 2026 standard workhorse for fast, adversarial tone checks
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    // Construct the system prompt
    const systemPrompt = `You are the BeforeSend Adversarial Engine. Your job is to be brutally honest and simulate the recipient's internal reaction.

You have access to the Master Vault which contains detailed grounding logic for different lenses (CFO, CTO, HR Lead, End User).

The user has selected the lens: ${lensType}

Your task:
1. Read the Master Vault content below carefully
2. Find the section that matches the ${lensType} lens
3. Apply that lens's grounding logic to analyze the email
4. Be adversarial, skeptical, and brutal in your assessment
5. Return ONLY a JSON object (no markdown, no code blocks) with exactly three fields:
   - score: a number from 0-100 (where 0 = terrible/high risk, 100 = perfect/low risk)
   - monologue: a brutally honest string showing what the recipient is thinking internally
   - pivot: a specific, actionable string telling the sender how to fix the message

=== MASTER VAULT START ===
${masterVault}
=== MASTER VAULT END ===

=== EMAIL TO ANALYZE ===
${emailText}
=== END EMAIL ===

Return ONLY valid JSON with {score, monologue, pivot}. No other text.`;

    // Call Gemini
    console.log("Calling Gemini API...");
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini response received:", text.substring(0, 100));

    // Parse the JSON response
    let analysisResult;
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        analysisResult = JSON.parse(text);
      }
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response", rawResponse: text },
        { status: 500 }
      );
    }

    // Validate the response structure
    if (
      typeof analysisResult.score !== "number" ||
      typeof analysisResult.monologue !== "string" ||
      typeof analysisResult.pivot !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid response structure from AI", rawResponse: analysisResult },
        { status: 500 }
      );
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Analysis error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      { 
        error: "Failed to analyze email", 
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
