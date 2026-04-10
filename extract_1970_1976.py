# -*- coding: utf-8 -*-
import pdfplumber, os, json

pdf_dir = "/Users/carl/Documents/巴菲特致股东的信原版"
years = [1970, 1971, 1972, 1973, 1974, 1975, 1976]

results = {}
for year in years:
    pdf_path = os.path.join(pdf_dir, f"{year}-Berkshire-AR.pdf")
    print(f"Extracting {year}...")
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for i, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                if page_text:
                    text += f"\n\n--- Page {i+1} ---\n\n" + page_text
        results[year] = text
        print(f"  {year}: {len(text)} chars")
    except Exception as e:
        print(f"  Error {year}: {e}")
        results[year] = ""

# Save raw text
out_dir = "/Users/carl/Documents/buffett-knowledge-base/_raw_pdfs"
os.makedirs(out_dir, exist_ok=True)
for year, text in results.items():
    with open(f"{out_dir}/{year}.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Saved {year}.txt ({len(text)} chars)")

print("\nDone!")
