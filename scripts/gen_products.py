import json

rings = [
    ("ring-solitaire-halo.jpg", "Solitaire Halo Ring", "Diamond", 285000, "An 18K white gold band with a brilliant round centre stone encircled by a halo of pave set stones."),
    ("ring-classic-band.jpg", "Classic Comfort Band", "Gold", 95000, "A clean, understated gold band finished with a soft polish for everyday elegance."),
    ("ring-bridal-set.jpg", "Bridal Duo Set", "Diamond", 340000, "A matching engagement and wedding band duo crafted for a lifetime of wear."),
    ("ring-eternity.jpg", "Eternity Band", "Gold", 210000, "A continuous line of round stones set edge to edge, symbolising unending commitment."),
    ("ring-designer-cut.jpg", "Designer Cut Ring", "Diamond", 265000, "A sculptural setting that frames a fancy cut centre stone with architectural precision."),
    ("ring-wedding-band-pair.jpg", "His and Hers Band Pair", "Gold", 180000, "A coordinating pair of wedding bands finished in warm polished gold."),
    ("ring-moissanite-round.jpg", "Round Moissanite Ring", "Silver", 78000, "A round brilliant moissanite centre stone set in 925 sterling silver with a gold plated finish."),
    ("ring-dream-bridal.jpg", "Dream Bridal Ring", "Diamond", 310000, "An heirloom inspired bridal ring with a raised centre setting and delicate milgrain detail."),
    ("ring-editorial-gold.jpg", "Rose Halo Statement Ring", "Gold", 255000, "A rose gold halo setting surrounding a clear round centre stone."),
    ("ring-editorial-silver.jpg", "Modern Silver Statement Ring", "Silver", 92000, "A contemporary silhouette in sterling silver, designed for everyday luxury."),
]

bracelets = [
    ("bracelet-tennis-classic.jpg", "Classic Tennis Bracelet", "Diamond", 320000, "A single line of matched round stones set in a secure claw setting."),
    ("bracelet-chain-link.jpg", "Chain Link Bracelet", "Gold", 145000, "A bold chain link design finished in high polish gold."),
    ("bracelet-charm-gold.jpg", "Gold Charm Bracelet", "Gold", 128000, "A delicate charm bracelet finished in warm polished gold."),
    ("bracelet-moissanite-silver.jpg", "Moissanite Line Bracelet", "Silver", 165000, "A ten point four carat total weight moissanite line bracelet in sterling silver."),
    ("bracelet-crystal-pave.jpg", "Crystal Pave Bracelet", "Silver", 68000, "A sparkling pave set bracelet finished with a secure clasp."),
    ("bracelet-clover-diamond.jpg", "Clover Motif Bracelet", "Diamond", 235000, "A refined clover motif bracelet set with round brilliant stones."),
    ("bracelet-cuban-gold.jpg", "Cuban Link Bracelet", "Gold", 198000, "A 14 karat gold cuban link bracelet with a bold, substantial feel."),
    ("bracelet-layered-stack.jpg", "Layered Stack Bracelet Set", "Gold", 156000, "A curated stack of fine bracelets designed to be layered and worn together."),
    ("bracelet-multishape-tennis.jpg", "Multishape Tennis Bracelet", "Diamond", 385000, "A 14K white gold tennis bracelet featuring a sequence of mixed cut lab grown stones."),
    ("bracelet-editorial-one.jpg", "Studio Line Bracelet", "Gold", 132000, "A minimal line bracelet finished in polished gold."),
    ("bracelet-editorial-two.jpg", "Studio Cuff Bracelet", "Silver", 87000, "A sculpted cuff bracelet in sterling silver with a soft brushed finish."),
    ("bracelet-editorial-three.jpg", "Studio Bangle Bracelet", "Gold", 112000, "A rounded bangle bracelet finished in warm gold tone."),
]

necklaces = [
    ("necklace-tennis-chain.jpg", "Iced Tennis Chain", "Diamond", 410000, "A graduated tennis chain set with round brilliant stones from two to six millimetres."),
    ("necklace-cuban-moissanite.jpg", "Cuban Moissanite Chain", "Silver", 265000, "A twenty millimetre cuban link chain set with round and emerald cut moissanite stones."),
    ("necklace-pendant-classic.jpg", "Classic Pendant Necklace", "Gold", 98000, "A timeless pendant on a fine gold chain, suited for everyday wear."),
    ("necklace-bridal-set.jpg", "Bridal Crown Jewellery Set", "Silver", 145000, "A coordinated necklace and earring set featuring crystal detailing for bridal occasions."),
    ("necklace-delicate-drop.jpg", "Delicate Drop Necklace", "Gold", 86000, "A slender chain finished with a single drop stone."),
    ("necklace-layered-gold.jpg", "Layered Gold Necklace Set", "Gold", 132000, "A set of fine chains designed to be layered for a curated look."),
    ("necklace-statement-piece.jpg", "Statement Necklace", "Diamond", 298000, "A bold statement necklace designed to anchor an evening look."),
    ("necklace-trio-cuban.jpg", "Trio Link Necklace", "Gold", 176000, "A bold cuban link chain paired with radiant accent pieces."),
    ("necklace-cushion-moissanite.jpg", "Cushion Cut Moissanite Pendant", "Gold", 245000, "A square cushion cut moissanite pendant set in 18K white gold."),
    ("necklace-letter-pendant.jpg", "Custom Letter Pendant", "Silver", 156000, "An emerald cut letter pendant in sterling silver, personalised for a meaningful gift."),
    ("necklace-solitaire-pendant.jpg", "Solitaire Pendant Necklace", "Diamond", 188000, "A single brilliant stone suspended on a fine chain."),
    ("necklace-infinity-link.jpg", "Infinity Link Pendant Chain", "Silver", 134000, "A custom infinity link chain finished with a personalised pendant."),
    ("necklace-portrait-pendant.jpg", "Detailed Pendant Necklace", "Silver", 122000, "A finely detailed pendant necklace with an iced finish."),
    ("necklace-cross-pendant.jpg", "Cross Pendant Necklace", "Silver", 118000, "A moissanite set cross pendant on a sterling silver chain with a white gold finish."),
    ("necklace-earring-set.jpg", "Pendant and Earring Set", "Silver", 108000, "A coordinated pendant necklace and earring set for a polished finish."),
    ("necklace-pear-set.jpg", "Pear Cut Necklace and Earring Set", "Diamond", 520000, "A graduated pear cut necklace paired with matching drop earrings."),
    ("necklace-solitaire-diamond.jpg", "Solitaire Diamond Necklace", "Diamond", 365000, "A single solitaire stone on a fine chain, designed to be worn close to the collarbone."),
]

watches = [
    ("watch-aura-dress.jpg", "Aura Dress Watch", "Gold", 245000, "A slim dress watch with a warm gold tone case and a refined dial."),
    ("watch-heritage-leather-set.jpg", "Heritage Leather Watch Set", "Gold", 320000, "A watch and leather strap gift set finished in a warm gold tone case."),
    ("watch-heritage-leather.jpg", "Heritage Leather Watch", "Gold", 285000, "A classic leather strap watch with a gold tone case and a clean dial."),
    ("watch-classic-steel-automatic.jpg", "Classic Steel Automatic Watch", "Silver", 780000, "A stainless steel automatic watch with a fluted bezel and a date window."),
    ("watch-editorial-one.jpg", "Studio Steel Watch", "Silver", 168000, "A steel bracelet watch with a clean, versatile dial."),
    ("watch-editorial-two.jpg", "Studio Leather Watch", "Gold", 152000, "A leather strap watch with a warm gold tone case."),
    ("watch-editorial-three.jpg", "Studio Minimalist Watch", "Silver", 138000, "A minimalist watch designed for everyday wear."),
    ("watch-editorial-four.jpg", "Studio Chronograph Watch", "Gold", 210000, "A chronograph watch finished in a warm gold tone."),
    ("watch-editorial-five.jpg", "Studio Two Tone Watch", "Gold", 198000, "A two tone watch pairing steel and gold tone finishes."),
    ("watch-editorial-six.jpg", "Studio Classic Watch", "Silver", 145000, "A classic round case watch with a steel bracelet."),
    ("watch-editorial-seven.jpg", "Studio Everyday Watch", "Silver", 128000, "A versatile everyday watch designed for daily wear."),
]

def build(items, type_name, folder):
    out = []
    for fname, name, material, price, desc in items:
        slug = fname.rsplit(".", 1)[0]
        out.append({
            "id": slug,
            "name": name,
            "type": type_name,
            "category": material,
            "price": price,
            "image": f"/images/products/{folder}/{fname}",
            "description": desc,
            "inStock": True,
        })
    return out

data = []
data += build(rings, "Rings", "rings")
data += build(bracelets, "Bracelets", "bracelets")
data += build(necklaces, "Necklaces", "necklaces")
data += build(watches, "Watches", "watches")

for i, p in enumerate(data):
    p["isNew"] = (i % 7 == 0)
    p["isBestSeller"] = (i % 5 == 0)
    p["discount"] = 10 if (i % 9 == 0) else 0

js = "// GEELUXX product catalog\n// Generated from the GEELUXX product photography library.\n\nconst products = " + json.dumps(data, indent=2) + ";\n\nexport default products;\n"

with open("/home/claude/geeluxx/src/data/products.js", "w") as f:
    f.write(js)

print(len(data), "products written to products.js")
