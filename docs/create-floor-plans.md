# Creating Floor Plans
We will be turning the floor plans into Scalable Vector Graphics (SVG) to allow for user interaction, css styling, and scalability. Before we create a floor plan, let us download one of the following programs:

**Free**
- Gimp (https://www.gimp.org/)
- Inkscape (https://inkscape.org/)
**Purchase**
- Affinity Designer (https://affinity.serif.com/en-us/designer/)
- Adobe Illustrator (https://helpx.adobe.com/illustrator/get-started.html)

For this tutorial, we will use Affinity Designer, but similar vector capabilities are provided in all programs listed. 

## Step 1: Obtain the Floor Plan
After choosing a building to work on, let us select a floor plan from these [QuACS pdfs](https://github.com/quacs/quacs-data/tree/5330bf53a2a553acfaee0ed7d03067b707464ce4/floor_plans). When choosing a floor, start with one that has the largest perimeter. By starting with the largest one, the following floors you create will be easier to align. It is best practice that one person finishes a whole building for design consistency.

## Step 2: Open the Image in Chosen Program
Launch your program, click on **'File'** from the menu, then select **'Open'**. Navigate to the location where your floor plan pdf is saved, select it, and click Open.

## Step 3: Resize the Canvas
It is good practice to keep the canvas small for easier use. The largest dimension of height or width can be between 100 to 500 pixels. To change the canvas size, click on **'File'** from the topbar, then select **'Document Setup'**. In my example, I will choose 300 x 200.

![image](https://github.com/Vacansee/app/assets/50114728/95997116-8526-4c12-83fe-aaefd0ccbd82)

As seen, my image is too large for the dimension. First we need to select all our floor plan elements. I can either click on the screen and drag a select square over the entire picture, or click on the layers menu, and press CTRL+A. Once selected, I SHIFT+click a corner maintain the aspect ratio and shrink the image down. 

![image](https://github.com/Vacansee/app/assets/50114728/7a9a5cd1-9126-450e-9a20-b4d0bb3bf250)

Center the image for sake of neatness.

## Step 3: Trace the Outer Walls
Let us create a semi-transparent rectangle in blue so we can find where we are working.

![image](https://github.com/Vacansee/app/assets/50114728/a6080a9c-b788-4a93-ba3d-fdab25db2f95)

If you double-click on the original floor plan, your program will detect that it should be considered for alignment. Let us go back and select our blue rectange again to align it to the floor plan.

![image](https://github.com/Vacansee/app/assets/50114728/eb697570-66a8-4913-8d7c-41977a167863)

As seen in the photo, there is a red and green alignment bar to suggest it snapped. Now resize the rest of the rectangle to be aligned. 

![image](https://github.com/Vacansee/app/assets/50114728/c18c1106-f034-4d9b-9efe-e1ba21df1da5)

Let us copy CTRL+C and paste CTRL+V our rectangle and align it the next wall.

![image](https://github.com/Vacansee/app/assets/50114728/473e5bc2-541d-4ae8-9bbe-50e91f130db0)

As you can see, the wall we created is slightly too large. That is intential, as it does not change our ability in interpretting the map, and makes viewing the map easier on the eyes. When we have many thicknesses, it distracts the user from their primary objective of finding paths/rooms. Let us use this same thickness for the entire border.

![image](https://github.com/Vacansee/app/assets/50114728/908c1d76-9f71-42ee-8271-241565eb0110)

Now we have completed lining the walls. Note that we did not cover door entrances. Let us group all our work by SHIFT+clicking the bottom curve in our layers list and the top curve of our layers list. Right click your selection and press group. Feel free to name your grouping.

## Step 4: Creating Inner Walls
To be completed
